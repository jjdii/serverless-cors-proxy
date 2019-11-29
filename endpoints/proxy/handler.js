'use strict'
module.exports = {

	/////////////////////////
	///// PROXY REQUEST /////
	proxyRequest: (event, context, callback) => {
		const buildResponse = require('../../lib/build-response')
		const checkFields = require('../../lib/check-fields')
		const cleanObject = require('../../lib/clean-object')
		const { not, isEmpty, join, omit, contains } = require('ramda')
		var request = require('request')

		const allowedFields = [
			'headers',
			'method',
			'url',
			'body'
		]
		const requiredFields = [
			'method',
			'url'
		]

		// FORMAT REQUEST BODY
		var requestBody = JSON.parse(event.body)
		requestBody = cleanObject(requestBody)

		// STRIP UNALLOWED FIELDS FROM REQUEST BODY
		const unallowedFields = checkFields.unallowed(allowedFields, requestBody)
		requestBody = omit(unallowedFields, requestBody)

		// ERROR IF MISSING REQUIRED FIELDS
		const missingFields = checkFields.required(requiredFields, requestBody)
		if (not(isEmpty(missingFields))) {
			return callback(null, buildResponse(200, {
				message: `proxy request error`,
				error: `missing required fields: ${join(', ', missingFields)}`
			}))
		}

		// CHECK IF METHOD ALLOWED
		if (!contains(requestBody.method.toLowerCase(), ['get', 'post', 'put', 'delete'])) {
			return callback(null, buildResponse(200, {
				message: `proxy request error`,
				error: `method not allowed: ${requestBody.method}`
			}))
		}

		// ASSEMBLE REQUEST POST DATA
		var requestOpts = {
			method: (requestBody.method) ? requestBody.method.toUpperCase() : 'GET',
			url: (requestBody.url) ? requestBody.url : ''
		}
		
		if (requestBody.headers) { 
			requestOpts.headers = (requestBody.headers) ? requestBody.headers : {} 
		}
		if (requestBody.body) {
			requestOpts.body = (requestBody.body) ? JSON.stringify(requestBody.body) : '{}'
		}

		// SEND POST
		try {
			request(requestOpts, function(error, response, body) {
				if (error) {
					console.log('error', error)

					return callback(null, buildResponse(500, {
						message: `proxy request error`,
						error: error
					}))
				} else {
					return callback(null, buildResponse(200, {
						message: `proxy request success`,
						data: body
					}))
				}
			})
		} catch(error) {
			console.log('error', error)

			return callback(null, buildResponse(500, {
				message: `proxy request error`,
				error: error
			}))
		}
	}
	///// END PROXY REQUEST /////
	/////////////////////////////

}

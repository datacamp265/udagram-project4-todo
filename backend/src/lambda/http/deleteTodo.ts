import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodoItem } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const todoId = event.pathParameters.todoId
  //const authorization = event.headers.Authorization
  //const split = authorization.split(' ')
  //const jwtToken = split[1]
  
  const userId = getUserId(event)
  
  try {
    await deleteTodoItem(userId, todoId)
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Credentials': true
     },
     body: ''
   }
  } catch (e) {
    
    return {
      statusCode: 500,
      body: e.message
    }
  }
}
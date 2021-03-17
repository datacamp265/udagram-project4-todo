import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getAllTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Caller event', event)
    
    //const authorization = event.headers.Authorization
    //const split = authorization.split(' ')
    //const jwtToken = split[1]
    
    const userId = getUserId(event)
    
    const items = await getAllTodosForUser(userId)
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items
        })
    }
  // TODO: Get all TODO items for a current user
}
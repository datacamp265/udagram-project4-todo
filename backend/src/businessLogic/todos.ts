import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { getUserId } from '../lambda/utils'
import { TodoAccess } from '../dataLayer/todosAccess'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
//import { parseUserId } from '../auth/utils'

const logger = createLogger('todos')

const todoAccess = new TodoAccess()

export async function getAllTodosForUser(userId: string): Promise<TodoItem[]> {
  
  //const userId = parseUserId(jwtToken)
  
  return todoAccess.getAllTodosByUser(userId)
}

export async function createTodoItem(
  createTodoRequest: CreateTodoRequest,
  userId: string): Promise<TodoItem> {
  logger.info('In createTodoItem() function')
 
  const itemId = uuid.v4()
  //const userId = parseUserId(jwtToken)
  logger.info('User Id:' + userId)
 
  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    createdAt: new Date().toISOString(),
    done: false
  })
}

export async function updateTodoItem(
  updateTodoRequest: UpdateTodoRequest,
  userId: string,
  todoId: string): Promise<TodoItem> {
  logger.info('in updateTodoItem() function')
  //const userId = parseUserId(jwtToken)
  
  logger.info('User Id:' + userId)
  
  return await todoAccess.updateTodo({
    todoId: todoId,
    userId: userId,
    name: updateTodoRequest.name,
    dueDate: updateTodoRequest.dueDate,
    createdAt: new Date().toISOString(),
    done: updateTodoRequest.done
  })
}

export async function deleteTodoItem(
  userId: string,
  todoId: string) {
  logger.info('In deleteTodoItem() function')
  
  //const userId = parseUserId(jwtToken)
  logger.info('User Id:' + userId)  
  
  return await todoAccess.deleteTodo(userId, todoId)
  }
  
export async function addAttachmentUrl(
  todoId: string) {
  logger.info('In addAttachmentUrl() function')
  
    return await todoAccess.generateUploadUrl(todoId)
  }
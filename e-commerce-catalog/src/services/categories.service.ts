import { ICategory } from '../types/category.types'
import httpService from './http'

export const getCategories = async (): Promise<ICategory[]> => httpService.get('/categories')

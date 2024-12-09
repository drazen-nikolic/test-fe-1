import { IProduct } from '../types/product.types'
import httpService from './http'

export const getProducts = async (): Promise<IProduct[]> => httpService.get('/products')

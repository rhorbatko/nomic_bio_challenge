import useSWR from 'swr'
import { fetchJson } from './fethcing'

type Dataset = {
    id: number,
    name: string
}

export function useDatasets () {
    const { data, error, isLoading } = useSWR<Dataset[]>('/api/dataset/', fetchJson)
   
    return {
      datasets: data,
      isLoading,
      isError: error
    }
  }
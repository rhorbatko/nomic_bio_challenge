import useSWR from 'swr'
import { fetchJson } from './fethcing'

export function useDatasets () {
    const { data, error, isLoading } = useSWR('/api/dataset/', fetchJson)
   
    return {
      datasets: data,
      isLoading,
      isError: error
    }
  }
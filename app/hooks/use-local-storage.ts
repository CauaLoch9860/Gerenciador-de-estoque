"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Estado para armazenar nosso valor
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Retorna um valor do localStorage ou o valor inicial
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error)
    }
  }, [key])

  // Retorna uma versão wrapped da função setter do useState que persiste o novo valor no localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Erro ao salvar no localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

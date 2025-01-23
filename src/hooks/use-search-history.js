import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export function useSeachHistory() {
    const [history, setHistory] = useLocalStorage("search-history", [])
    
    const QueryClient = useQueryClient()
    const historyQuery = useQuery({
        queryKey: ["search-history"],
        queryFn: ()=> history,
        initialData: history
    })

    const addToHistory = useMutation({
        mutationFn: async (search) => {
            const newSeach = {
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt: Date.now()
            }

            const filteredHistory = history.filter(
                (item) => !(item.lat === search.lat && item.lon === search.lon)
            )
            
            const newHistory = [newSeach, ...filteredHistory].slice(0, 10)

            setHistory(newHistory)
            return newHistory
        },
        onSuccess:(newHistory)=>{
            QueryClient.setQueryData(["search-history"], newHistory)
        }
    })

    const clearHistory = useMutation({
        mutationFn: async()=>{
            setHistory([])
            return []
        },
        onSuccess: () => {
            QueryClient.setQueryData(["search-history"], [])
        }
    })

    return {
        history: historyQuery.data,
        addToHistory,
        clearHistory,
    }
}
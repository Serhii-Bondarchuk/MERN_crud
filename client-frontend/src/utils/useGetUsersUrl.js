import { useContext } from "react"
import { UrlContext } from "../App"

export const useGetUsersUrl = () => {
  const urlAPI = useContext(UrlContext)
  const urlDev = 'http://localhost:8000'
  const urlDeploy = process.env.NODE_ENV === 'production' ? urlAPI : urlDev
  return urlDeploy
}
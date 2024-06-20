import { useContext } from "react"
import { UrlContext } from "../App"

export const useGetUsersUrl = () => {
  const urlAPI = useContext(UrlContext)
  const urlDev = 'http://localhost:8000'
  console.log(process.env.NODE_ENV)
  const urlDeploy = process.env.NODE_ENV === 'production' ? urlAPI : urlDev
  console.log(urlDeploy, 6666666666)
  return urlDeploy
}
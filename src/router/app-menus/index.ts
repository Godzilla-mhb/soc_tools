import DASHBOARD from '../routes/modules/dashboard'
import RECORD from '../routes/modules/record'

const mixinRoutes = [DASHBOARD, RECORD]

const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el
  return {
    name,
    path,
    meta,
    redirect,
    children,
  }
})

export default appClientMenus

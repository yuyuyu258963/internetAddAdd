import { NavLink, Route, Routes } from 'react-router-dom'
import {routes} from "./router"

import "./index.scss"

export default function Loading() {
  return (

    <div className="view-loading">
      <section className="view-loading__spinner">
          <header className="view-loading__spinner__header">
            登录
          </header>

        <Routes >
          <Route path="*" element={<routes.loading.component />} ></Route>
          <Route path="/loading" element={<routes.loading.component />} ></Route>
          <Route path="/register" element={<routes.register.component />} ></Route>
          <Route path="/findPwd" element={<routes.findPwd.component />} ></Route>
        </Routes>
      </section>
    </div>
  )
}
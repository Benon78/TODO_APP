/** @format */

import { redirect } from "react-router-dom";

export async function requiredAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    throw redirect(
      `/login?message=You need to login to access this page.&redirectTo=${pathname}`
    );
  }
}


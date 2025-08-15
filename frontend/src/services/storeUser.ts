export default function storeUser(data: any) {
  const AUTH_TOKEN: string = data.access_token;
  sessionStorage.setItem("api_token", AUTH_TOKEN);
  sessionStorage.setItem("hostname", data.hostname);
  sessionStorage.setItem("user_name", data.user_name);
  sessionStorage.setItem("user_fields", JSON.stringify(data.user_fields));
  sessionStorage.setItem("user_roles", JSON.stringify(data.user_roles));
  sessionStorage.setItem("language", "nl");
}

export default function storeUser(data: any) {
  sessionStorage.setItem("access", data.access);
  sessionStorage.setItem("refresh", data.refresh);

}

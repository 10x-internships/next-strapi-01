export const LoginReq = () => `
    usersPermissionsUsers(filters: {username:{contains: "admin"}}){
        data{
          id
        }
      }
    `;

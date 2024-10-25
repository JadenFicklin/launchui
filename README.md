![GIF 9-18-2024 7-04-08 PM](https://github.com/user-attachments/assets/1c58c1f9-42fa-4e6e-8c3c-e546dce37a62)

Use `yarn` to install your packages, and `yarn dev` to run it.

This runs off of the T3 stack and uses a few opinionated packages such as:
- [**heroicons**](https://heroicons.com/): Icon set
- [**floating-ui**](https://floating-ui.com/): Used for floating elements such as dropdown menus, tooltips, popovers, ect
- [**headlessui**](https://headlessui.com/): Used for dropdown menus, modals, ect
- [**jotai**](https://jotai.org/): State managaement for things like the theme
- [**react-hook-form**](https://react-hook-form.com/): Form managaement
- [**tailwind-merge**](https://www.npmjs.com/package/tailwind-merge): Library for merging tailwind styles
- [**tanstack-table**](https://tanstack.com/table/latest): Uses version react table version 8 for tables

Here is the .env you'll need to start this project:

```env
# When adding additional environment variables, the schema in "/src/env.js"
# should be updated accordingly.

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"
```

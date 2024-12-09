This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

### Additional steps (Drazen)
set JWT_SECRET=secret
npx prisma db push


```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Decisions made during implementation

Next.js is chosen as low-config starter technology and seamless integration with PostgreSQL (Supabase) and Prisma, as well as automated continuous integration on relation Github-Vercel.

### Future plans and improvements

- Add loaders for better UX.
- Conduct uniform error handling reflected through user-friendly toast message.
- Introduce uniform response constructor.
- Error state screens and partials.
- Include localization, multiangular support.
- Add multiple themas.

### Potential refactors for better scaling

- Refactor forms to be handled with `react-hook-form` and `zod` for schemas and types.
- Refactor to use `axios` and `react-query` for client-side http requests for better future scaling.
- Introduce Next dynamic imports where needed (e.g. dnd components).
- Extract dnd-logic from `Dashboard.tsx` and make it reusable and confurable.
- Refactor widgets to reuse same layout (card) and their forms, to keep DRY principle.

### Pros

- Next.js, Prisma, Postgres and Vercel is a powerful toolkit for smaller fullstack apps.
- Low configuration dev environment providing good developer experience.
- Todo list widget works under optimistic update principle.

### Cons

- It could have been monorepo with widgets as packages and dashboard as consumer app.
- JsonValue was flexible but not good idea as it somehow impairs value change recognition in Next.js, so reconciliation isn't working if object is nested in prop data.
- APIs are not scalable in this setup.

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true, // ✅ Ensures better debugging
  trailingSlash: false, // ✅ Prevents issues with paths
  // headers: async () => {  // Removed this section
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "no-store, no-cache, must-revalidate, proxy-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },
};
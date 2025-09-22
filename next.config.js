/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evitar prerenderizado de páginas que usan autenticación
  trailingSlash: true,
};

module.exports = nextConfig;

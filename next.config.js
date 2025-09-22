/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deshabilitar prerenderizado para páginas con autenticación
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;

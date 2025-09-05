/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [],
  },
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
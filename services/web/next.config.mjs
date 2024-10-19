/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.githubassets.com",
            },
            {
                protocol: "https",
                hostname: "img.icons8.com",
            },
        ],
    },
};

export default nextConfig;

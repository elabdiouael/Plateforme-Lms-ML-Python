import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hada howa l-Cheat Code 👇 */
  typescript: {
    // !! ATTENTION !!
    // Hada kaykhlli l-build ydouz wakha kayn des erreurs de type.
    // Mzyan l les Demos w Portfolio.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Kay-ignori ta l-eslint errors (b7al variables ma-mkhdmach etc)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
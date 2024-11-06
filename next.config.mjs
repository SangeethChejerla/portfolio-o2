import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  missingSuspenseWithCSRBailout: false,
  noEmitOnError: false,
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default withMDX(config);

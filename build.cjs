const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./content.js'],
    bundle: true,
    outfile: './dist/content.js',
    platform: 'browser',
    format: 'iife',
    sourcemap: true,
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    external: ['fs'], // ignore Node modules
    plugins: [
        {
            name: 'fs-stub',
            setup(build) {
                build.onResolve({ filter: /^fs$/ }, args => ({
                    path: args.path,
                    namespace: 'fs-stub',
                }));
                build.onLoad({ filter: /.*/, namespace: 'fs-stub' }, () => ({
                    contents: 'export default {}',
                    loader: 'js',
                }));
            },
        },
    ],
    loader: {
        '.js': 'js',
    },
});

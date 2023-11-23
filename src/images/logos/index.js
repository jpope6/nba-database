const importAll = (context) => context.keys().reduce((acc, key) => {
    acc[key.replace('./', '').replace('.png', '')] = context(key);
    return acc;
}, {});

// Import all images using require.context
const logosContext = require.context('./', false, /\.png$/);
const teamLogos = importAll(logosContext);

export { teamLogos };

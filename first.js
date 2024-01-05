const sitemap = require("algolia-sitemap");

// You need an API key with `browse` permission
const algoliaConfig = {
	appId: "CFV22813P6",
	apiKey: "6d80dd4fbfa4e8a4d9f2687d9babd5bc",
	indexName: "products",
};
// Turn a record into a sitemap entry

const categoryToLink = (str) => {
	return str
		.split(" ")
		.map((i) => {
			return encodeURIComponent(i.toLowerCase());
		})
		.join("+");
};
const alreadyAdded = {};
function hitToParams(product) {
	const {objectID, Live} = product;
	const url = `https://paktec.pk/product/${objectID}`;
	if (Live) {
		const {HCategories} = product;
		if (HCategories) {
			const newCategories = Object.values(HCategories).filter((item) => {
				return (
					item !== "" &&
					item !== undefined &&
					!alreadyAdded[item]
				);
			});
			const locs = [];
			newCategories.forEach((category) => {
				alreadyAdded[category] = category;
				alreadyAdded[url] = url;

				locs.push(
					...[
						{loc: `https://example.com/${encodeURI(category)}`},
						{loc: url},
					],
				);
			});
			console.log(locs);
            
		}

		return {loc: url};
	} else {
		return null;
	}
}
sitemap({
	algoliaConfig,
	// ...
	hitToParams,
	// The URL of the sitemaps directory
	sitemapLoc: "https://paktec.com/sitemaps",
	// The directory with all sitemaps (default: `sitemaps`)
	outputFolder: "sitemaps",
});

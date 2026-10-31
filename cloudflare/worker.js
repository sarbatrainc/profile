export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "raghavghimire.com.np") {
      url.hostname = "www.raghavghimire.com.np";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

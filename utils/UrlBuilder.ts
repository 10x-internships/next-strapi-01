const URL = "http://localhost:1337";
const PLACEHOLDERIMGURL = "/uploads/monitor_placeholder_a42c35284f.jpg";

export const urlBuilder = (url: string) => {
	if (!url) {
		return URL + PLACEHOLDERIMGURL;
	}
	return URL + url;
};

import { useEffect, useState } from "react";

import MarkdownView from "@/components/MarkdownView";



interface MarkdownFileViewProps {
	uri: string
}
/** View to render Markdown code retrieved from a local source */
function MarkdownFileView({ uri }: MarkdownFileViewProps) {
	const [content, setContent] = useState<string>('');


	const parsed = new URL(uri, window.location.origin);
	if (parsed.origin !== window.location.origin)
		throw new Error('Markdown files can only be fetched locally.');


	useEffect(() => {
		fetch(uri)
			.then(resp => resp.text())
			.then(setContent)
		;
	}, []);
	

	return <MarkdownView content={content} />;
}



export default MarkdownFileView;
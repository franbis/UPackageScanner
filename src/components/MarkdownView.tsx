import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

import { Separator } from "@/components/ui/separator";
import BaseView from "@/components/BaseView";



interface MarkdownCardProps {
	/** Markdown code */
    content: string
}
/** View to render Markdown code */
function MarkdownView({ content }: MarkdownCardProps) {
	
	// Custom components for ReactMarkdown.
	const comps: Components = {
		h1: ({node, children, ...props}) => (<>
			<h1 className='text-2xl font-bold not-first:mt-3' {...props}>
				{children}
			</h1>
			<Separator className='my-3' />
		</>),
		h2: ({node, ...props}) => <h2 className='text-xl font-bold mb-2 not-first:mt-6' {...props} />,
		p: ({node, ...props}) => <p className='px-2 pb-3' {...props} />,
		code: ({node, ...props}) => <code className='px-2 py-0.5 bg-gray-800' {...props} />,
	};


	return (
		<BaseView
			content={(
				<div className='text-gray-300'>
					<ReactMarkdown
						components={comps}
						rehypePlugins={[rehypeRaw]}
					>
						{content}
					</ReactMarkdown>
				</div>
			)}
		/>
	);
}



export default MarkdownView;
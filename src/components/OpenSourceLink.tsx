import GitHubIcon from '@/assets/img/icons/brands/github-mark.svg?react';
import type { ComponentProps } from 'react';



/** A link to visit the open-source codebase for the project */
function OpenSourceLink(props: ComponentProps<'a'>) {
    return (
        <a href={__OPEN_SOURCE_URL__} target='_blank' {...props}>
            <GitHubIcon
                className="text-xl w-[1em] h-[1em] [&_path]:fill-muted-foreground hover:[&_path]:fill-accent-foreground [&_path]:transition-colors [&_path]:duration-300"
                // Match width/height defined in the svg file.
                viewBox="0 0 98 96"
            />
        </a>
    );
}



export default OpenSourceLink;
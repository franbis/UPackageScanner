import GitHubIcon from '@/assets/img/icons/brands/github-mark.svg?react';



/** A link to visit the open-source codebase for the project */
function OpenSourceLink() {
    return (
        <a href={__OPEN_SOURCE_URL__} target='_blank'>
            <GitHubIcon
                className="fixed top-4 right-4 w-[1em] h-[1em] [&_path]:fill-muted-foreground hover:[&_path]:fill-accent-foreground [&_path]:transition-colors [&_path]:duration-300"
                // Match width/height defined in the svg file.
                viewBox="0 0 98 96"
            />
        </a>
    );
}



export default OpenSourceLink;
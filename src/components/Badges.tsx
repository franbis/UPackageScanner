/**
 * Compendium of badges.
 */

import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";



// General badges.

interface CountBadgeProps extends ComponentProps<typeof Badge> {
    count: number
}
function CountBadge({ count, ...props }: CountBadgeProps ) {
    const countStr = (count > 99) ? '99+' : String(count);

    return <Badge variant='count' {...props}>{ countStr }</Badge>
}


// App badges.

function OfflineAppBadge(props: ComponentProps<typeof Badge>) {
    return <Badge variant='default' {...props}>Works Offline</Badge>
}


// Package analysis badges.

function NeutralBadge(props: ComponentProps<typeof Badge>) {
    return <Badge variant='neutral' {...props}>Neutral</Badge>
}
function SuspiciousBadge(props: ComponentProps<typeof Badge>) {
    return <Badge variant='suspicious' {...props}>Suspicious</Badge>
}
function DangerousBadge(props: ComponentProps<typeof Badge>) {
    return <Badge variant='dangerous' {...props}>Dangerous</Badge>
}



export {
    CountBadge,
    OfflineAppBadge,
    NeutralBadge,
    SuspiciousBadge,
    DangerousBadge
}
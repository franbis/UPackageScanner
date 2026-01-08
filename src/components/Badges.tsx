/**
 * Compendium of badges.
 */

import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";



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
    OfflineAppBadge,
    NeutralBadge,
    SuspiciousBadge,
    DangerousBadge
}
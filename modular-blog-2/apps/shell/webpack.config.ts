import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default async (c) => {
    const fromModuleFederation = await withModuleFederation(config, { dts: false });
    c = fromModuleFederation(c);

    c.output.scriptType = "text/javascript"


    return c;
}

import * as React from "react";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp";
import { taxonomy, ITermData, ITerm } from '@pnp/sp-taxonomy';
import { CommandBar, ICommandBarProps, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

export interface ITopMenuProps {
    termSetId: string;
}

export interface ITopMenuState {
    // terms: (ITermData & ITerm)[];
    terms: ICommandBarItemProps[];
}

export default class TopMenu extends React.Component<ITopMenuProps, ITopMenuState> {
    public constructor(props) {
        super();

        this.state = {terms: []};
    }

    public componentWillMount() {
        console.log("Term Set ID:", this.props.termSetId);
        taxonomy.getDefaultSiteCollectionTermStore()
                .getTermSetById(this.props.termSetId)
                .terms.get().then(
                    taxTerms => {
                        console.log(taxTerms);
                        let navItems = taxTerms.map(term => {
                            return {
                                href: term.LocalCustomProperties._Sys_Nav_SimpleLinkUrl,
                                title: term.Name,
                                name: term.Name
                            } as ICommandBarItemProps;
                        });
                        this.setState({
                            terms: navItems
                        });
                        console.log(this.state);
                    }
                );
    }

    public render(): React.ReactElement<ITopMenuProps> {
        return (
            <div>
                <CommandBar
                    items={this.state.terms}
                />
                {/* {this.state.terms.map(term => {
                    return <span><a href={term.LocalCustomProperties._Sys_Nav_SimpleLinkUrl}>{term.Name}</a></span> 
                })} */}
            </div>
        );
    }
}

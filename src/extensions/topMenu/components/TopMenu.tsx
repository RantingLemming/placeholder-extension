import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

export interface TopMenuProps {
    termSetId: string;
}

export default class TopMenu extends React.Component<TopMenuProps, {}> {
    public render(): React.ReactElement<TopMenuProps> {
        return (
            <div>
                hello world
            </div>
        );
    }
}
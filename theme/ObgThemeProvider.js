

import React from 'react';
import getObgTheme from './getObgTheme';

class ObgThemeProvider extends React.Component {

    static propTypes = {
        children: React.PropTypes.element,
        obgTheme: React.PropTypes.object,
    };

    static childContextTypes = {
        obgTheme: React.PropTypes.object.isRequired,
    };

    getChildContext() {
        return {
            obgTheme: this.props.obgTheme || getObgTheme(),
        };
    }

    render() {
        return this.props.children;
    }
}

export default ObgThemeProvider;

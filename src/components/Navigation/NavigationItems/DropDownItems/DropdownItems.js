import React, { Component } from 'react';
import DropDownItem from './DropDownItem/DropdownItem';
import classes from './DropDownItems.module.css';

class dropdownItems extends Component {
    state = {
        showDropDown: false
    }

    dropDownToggleHandler = () => {
        this.setState((prevState) => {
            let newshowDropDown = !prevState.showDropDown;
            if (newshowDropDown) {
                document.addEventListener('mousedown', this.handleClickOutside);
            }
            else {
                document.removeEventListener('mousedown', this.handleClickOutside);
            }
            return { showDropDown: !prevState.showDropDown };
        });
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.dropDownToggleHandler();
        }
    }

    render() {

        let items = null;
        if (this.props.items) {
            items = Object.keys(this.props.items).map(itemKey => {
                return <DropDownItem 
                            key={this.props.items[itemKey].name}
                            url={'/'+ (this.props.items[itemKey].locale ? itemKey : this.props.currentLocale) + '/' + this.props.items[itemKey].page} 
                            >
                            {this.props.items[itemKey].name}
                        </DropDownItem>
            });
        }
        let attachedClasses = [classes.Close];
        if (this.state.showDropDown) {
            attachedClasses = [classes.Open];
        }
        return (
            <li className={classes.DropDownItems}>
                <a
                    onClick={this.dropDownToggleHandler}
                    className={classes.DropDownItemsAnchor}
                    href={this.props.link}
                >{this.props.dropDownTitle}&nbsp;
                    <b className={classes.Caret}></b>
                </a>
                <ul ref={this.setWrapperRef} className={attachedClasses.join(' ')} >
                    {items}
                </ul>
            </li>
        );
    }
}

export default dropdownItems;
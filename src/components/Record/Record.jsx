import React from 'react';
import AddRecord from './AddRecord';
import DeleteCategory from './DeleteCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import RecordService from '../../services/RecordService';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
    this.retrieveCategories = this.retrieveCategories.bind(this);
  }

  render() {
    return (
      <>
        {this.props.isOpen &&
          <>
            <div className="title-block">
              <h3 className="title">Страница записей</h3>
            </div>
            <div className="record-content-block">
              <div className="row">
                <div className="col-md-6">
                  <AddRecord categories={this.state.categories} />
                  <DeleteCategory categories={this.state.categories}
                    retrieveCategories={this.retrieveCategories} />
                </div>
                <div className="col-md-6">
                  <AddCategory retrieveCategories={this.retrieveCategories} />
                  <EditCategory categories={this.state.categories}
                    retrieveCategories={this.retrieveCategories} />
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }

  retrieveCategories() {
    RecordService.retrieveCategories()
      .then(result => this.setState({ categories: result }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.retrieveCategories();
  }
}

export default Record;
export default (props) => (
    <div className="card">
        <div className="card-header">
            {props.title} {props.selectedUser}
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
)
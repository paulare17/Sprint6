export default function Targetes(props) {
    console.log(props)
    return (
        <section>
        <div className="targeta-container">
          <div className="targeta">
            <div className="targeta-info">
              <h5>{props.service}</h5>
              <p>{props.description}</p>
            </div>
            <div className="targeta-preu">
              <h4>{props.price} €</h4>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="seo" />
                <label className="form-check-label" htmlFor="seo">
                  Afegeix
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
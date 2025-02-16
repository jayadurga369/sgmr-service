import React from 'react';
import { Link } from 'react-router-dom';
import nationalities from '../../utils/staticFormData';
import FormError from '../Voyage/FormError';

const FormVessel = ({
  handleSubmit, handleChange, formData, errors, sourceForm, vesselId,
}) => {
  return (
    <section>
      <div id="vesselName" className={`govuk-form-group ${errors.vesselName ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselName-input">
          Pleasure craft name
        </label>
        <FormError error={errors.vesselName} />
        <div className="govuk-hint">For example Baroness</div>
        <input
          className="govuk-input"
          id="vesselName-input"
          name="vesselName"
          type="text"
          value={formData.vesselName || ''}
          onChange={handleChange}
        />
      </div>

      <div id="vesselType" className={`govuk-form-group ${errors.vesselType ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="vesselType-input">
          Pleasure craft type
        </label>
        <FormError error={errors.vesselType} />
        <div className="govuk-hint">For example Yacht or Sailboat</div>
        <input
          className="govuk-input"
          id="vesselType-input"
          name="vesselType"
          type="text"
          value={formData.vesselType || ''}
          onChange={handleChange}
        />
      </div>

      <div id="moorings" className={`govuk-form-group ${errors.moorings ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="moorings-input">
          Usual moorings
        </label>
        <div className="govuk-hint">A description, UNLOCODE or set of Coordinates for where the pleasure craft is usually moored</div>
        <FormError error={errors.moorings} />
        <input
          className="govuk-input"
          id="moorings-input"
          name="moorings"
          type="text"
          value={formData.moorings || ''}
          onChange={handleChange}
        />
      </div>

      <div id="registration" className={`govuk-form-group ${errors.registration ? 'govuk-form-group--error' : ''}`}>
        <label className="govuk-label" htmlFor="registration-input">
          Registration number
        </label>
        <FormError error={errors.registration} />
        <input
          className="govuk-input"
          id="registration-input"
          name="registration"
          type="text"
          value={formData.registration || ''}
          onChange={handleChange}
        />
      </div>

      <div id="hullIdentificationNumber" className="govuk-form-group">
        <label className="govuk-label" htmlFor="hullIdentificationNumber-input">
          Hull identification number (optional)
        </label>
        <input
          className="govuk-input"
          id="hullIdentificationNumber-input"
          name="hullIdentificationNumber"
          type="text"
          value={formData.hullIdentificationNumber || ''}
          onChange={handleChange}
        />
      </div>

      <div id="callsign" className="govuk-form-group">
        <label className="govuk-label" htmlFor="callsign-input">
          Callsign (optional)
        </label>
        <input
          className="govuk-input"
          id="callsign-input"
          name="callsign"
          type="text"
          value={formData.callsign || ''}
          onChange={handleChange}
        />
      </div>

      <div id="vesselNationality" className="govuk-form-group">
        <label className="govuk-label" htmlFor="vesselNationality-select">
          Pleasure craft nationality (optional)
        </label>
        <select
          className="govuk-select"
          id="vesselNationality-select"
          name="vesselNationality"
          value={formData.vesselNationality || ''}
          onChange={handleChange}
        >
          <option>- Please select -</option>
          {nationalities.map((vesselNationality) => (
            <option key={vesselNationality.value} value={vesselNationality.value}>{vesselNationality.label}</option>
          ))}
        </select>
      </div>

      <div id="portOfRegistry" className="govuk-form-group">
        <label className="govuk-label" htmlFor="portOfRegistry-input">
          Port of registry (optional)
        </label>
        <input
          className="govuk-input"
          id="portOfRegistry-input"
          name="portOfRegistry"
          type="text"
          value={formData.portOfRegistry || ''}
          onChange={handleChange}
        />
      </div>

      {sourceForm !== 'voyage'
        && (
          <>
            <div id="submitBlock" className="govuk-button-group">
              <button
                type="submit"
                className="govuk-button"
                data-module="govuk-button"
                onClick={handleSubmit}
              >
                Save
              </button>
              {vesselId
                && (
                <Link className="govuk-button govuk-button--warning" to={`/pleasure-crafts/${vesselId}/delete`}>
                  Delete this pleasure craft
                </Link>
                )}
            </div>
            <p className="govuk-body">
              <Link to="/pleasure-crafts" className="govuk-link govuk-link--no-visited-state">Exit without saving</Link>
            </p>
          </>
        )}
    </section>
  );
};

export default FormVessel;

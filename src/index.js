import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

require("dayjs/locale/nl");
dayjs.locale("nl");
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
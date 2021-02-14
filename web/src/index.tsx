import { h, render } from 'preact';
import 'preact/devtools';
import App from './App.js';
import {
  BrowserRouter as Router,
} from "react-router-dom";


const root = document.getElementById('root')

if (root) {
  render(<Router><App /></Router>, root);
}

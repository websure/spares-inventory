import React, { useEffect, useRef } from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
// import ErrorBoundary, { ERROR_TYPES } from './components/common/ErrorBoundary';

import CreatePart from './pages/CreatePart';
import Home from './pages/Home';
import StoreProvider from './store/ContextManagement';

/* defining Location state structure */
type LocationState = {
  modal?: boolean;
};

/* Extending Types of Route */
type Props = RouteComponentProps<{}, {}, LocationState>;

const Routes: React.FC<Props> = (props: Props) => {
  const { location, history } = props;
  const previouslocation = useRef(location);

  const isModal = !!(
    location?.state?.modal && previouslocation.current !== location
  );

  useEffect(() => {
    if (
      history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      previouslocation.current = location;
    }
  }, [location, history.action]);

  return (
    // <ErrorBoundary type={ERROR_TYPES.DEFAULT}>
    <StoreProvider>
      <Switch location={previouslocation.current || location}>
        <Route exact path="/" component={Home} />
      </Switch>
      {isModal && <Route path="/create" component={CreatePart} />}
    </StoreProvider>
    // </ErrorBoundary>
  );
};

export default withRouter(Routes);

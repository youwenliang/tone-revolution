import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Topic1 from './topic/Topic1';
import Topic2 from './topic/Topic2';
import Topic3 from './topic/Topic3';
import Topic4 from './topic/Topic4';
import Topic5 from './topic/Topic5';

import $ from 'jquery';

class Main extends Component {
  updateActions = () => {
    window.scrollTo(0, 0);

    /* Switch Topic Images */
    if($('.topic-image').length) {
      var original = $('.topic-image img').attr('src').replace('images/', '');
      if($(window).width() < 960) {
        $('.topic-image img').attr('src', 'images/small_' + original);
      } else {
        $('.topic-image img').attr('src', 'images/' + original);
      }
    }
    if($('.topic').length) {
      $('.topic').hover(function(){
        var src = $(this).find('img').attr('src');
        console.log(src.split('/')[0]);console.log(src.split('/')[1]);
        if(src.indexOf('move') < 0) $(this).find('img').attr('src', src.split('/')[0]+"/move_"+src.split('/')[1]);
      }, function(){
        var src = $(this).find('img').attr('src');
        if(src.indexOf('move') >= 0) $(this).find('img').attr('src', src.split('/')[0]+"/"+src.split('/')[1].replace('move_',''));
      });
    }

    $('.hideme').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if( bottom_of_window > bottom_of_object ){
        $(this).removeClass('hideme');
      }  
    });
    if($('#section-1').length) {
      for (var i = 1; i < 5; i++) {
        if($(window).scrollTop() >= $('#section-'+i).offset().top - $(window).height()/2) {
          $('.active').removeClass('active');
          $('a[href="#section-'+i+'"]').addClass('active');
        }
      }
    };
    $('#section-nav a').click(function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
    });
  }
  componentDidMount(prevProps, prevState) {
    this.updateActions();
    console.log('mount');
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateActions();
    console.log('update');
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/respect-life' component={Topic1} />
          <Route exact path='/gender-equality' component={Topic2} />
          <Route exact path='/aesthetic-education' component={Topic3} />
          <Route exact path='/self-realization' component={Topic4} />
          <Route exact path='/critical-thinking' component={Topic5} />
          <Redirect from='*' to='/' />
        </Switch>
      </main>
    );
  }
}

export default Main;

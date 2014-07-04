<?php
/**
 * @package   ImpressPages
 */


/**
 * Created by PhpStorm.
 * User: mangirdas
 * Date: 6/24/14
 * Time: 4:25 PM
 */

namespace Plugin\WidgetSkeleton;


class AdminController
{
    public function widgetPopupForm()
    {
        $widgetId = ipRequest()->getQuery('widgetId');

        $widgetRecord = \Ip\Internal\Content\Model::getWidgetRecord($widgetId);
        $widgetData = $widgetRecord['data'];

        $form = new \Ip\Form();

        $form->setEnvironment(\Ip\Form::ENVIRONMENT_ADMIN);


        $form->addField(new \Ip\Form\Field\Text(
                array(
                    'name' => 'title',
                    'label' => 'Title',
                    'value' => empty($widgetData['title']) ? null : $widgetData['title']
                )
            )
        );

        $form->addField(new \Ip\Form\Field\Textarea(
                array(
                    'name' => 'text',
                    'label' => 'Text',
                    'value' => empty($widgetData['text']) ? null : $widgetData['text']
                )
            )
        );


        $popup = ipView('view/editPopup.php', array('form' => $form))->render();
        $data = array(
            'popup' => $popup
        );
        return new \Ip\Response\Json($data);

    }



}

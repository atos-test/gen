import os

def build():
    """
    This script allows the user to take raw SVG images and convert them into CSS
    that is readable by jQuery Mobile 1.4+
    """
    basedir = '/Users/andymatthews/Dropbox/github/jQuery-Mobile-Icon-Pack/'
    files = os.listdir(basedir + 'source/SVG')
    svg_declarations = []
    png_declarations = []
    html_declarations = []

    # loop over all SVG files in dir
    for filename in files:

        # make sure that we're only doing SVG files
        if filename.endswith(".svg"):

            # get the raw file name, and path
            filename_no_ext = filename.replace('.svg', '')
            path = "{}/TEMP/SVG/{}".format(basedir, filename)

            # read the file
            file = open(path, 'r')
            xml = stringify(file.read())

            # convert
            svg_declarations.append( make_svg_template(filename_no_ext, xml) )
            png_declarations.append( make_png_template(filename_no_ext) )
            html_declarations.append( make_html_template(filename_no_ext) )

    # write the output
    write_output( basedir, svg_declarations, png_declarations )
    print ''.join(html_declarations)

def stringify(xml):

    # declutter
    xml = xml.replace('<!-- Generated by IcoMoon.io -->\n', '')
    xml = xml.replace('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n', '')

    # swap out sizes
    xml = xml.replace('width="500"', 'width="16"')
    xml = xml.replace('height="500"', 'height="16"')

    # and colors
    xml = xml.replace(' fill="#000000"', ' fill="#ffffff"')

    # replace entities
    xml = xml.replace('<', '%3C')
    xml = xml.replace('?', '%3F')
    xml = xml.replace(' ', '%20')
    xml = xml.replace('=', '%3D')
    xml = xml.replace('"', '%22')
    xml = xml.replace('>', '%3E')
    xml = xml.replace(',', '%2C')
    xml = xml.replace('/', '%2F')
    xml = xml.replace(':', '%3A')
    xml = xml.replace('\n', ' ')

    return xml

def destringify(str):
    str = str.replace('%3C', '<')
    str = str.replace('%3F', '?')
    str = str.replace('%20', ' ')
    str = str.replace('%3D', '=')
    str = str.replace('%22', '"')
    str = str.replace('%3E', '>')
    str = str.replace('%2C', ',')
    str = str.replace('%2F', '/')
    str = str.replace('%3A', ':')
    return str

def make_html_template(name):
    html = """
    <a href="index.html" data-role="button" data-icon="{0}" >data-icon="{0}"</a>""".format(name)
    return html

def make_file_header():
    header = """
    /*!
    * jQuery Mobile Icon Pack - Font Awesome version 1.4.0
    *
    * Copyright 2013 Andy Matthews
    * http://andyMatthews.net
    * Released under the GPL/MIT license.
    *
    */
    """
    return header

def make_svg_template(name, xml):
    tmpl = """
    .ui-icon-{0}:after {{
        background-image: url('data:image/svg+xml;charset=US-ASCII,{1}');
    }}""".format(name, xml)
    return tmpl

def make_png_template(name):
    tmpl = """
    .ui-nosvg .ui-icon-{0}:after {{
        background-image: url('png_icons/{0}.png');
    }}""".format(name)
    return tmpl

def write_output(dir, svg, png):
    output_filename = 'jqm-icon-pack-fa.scss'
    header = make_file_header()
    svg = ''.join(svg)
    png = ''.join(png)

    scss = open(dir + output_filename, 'w')

    scss.write(header)
    scss.write(svg)
    scss.write(png)

    scss.close()


if __name__ == "__main__":
    build()
